const User = require('./UserModel');

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = angle => (angle * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const findUsers = async (req, res) => {
  const { latitude, longitude, page = 1, limit = 10 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }

  try {
    const users = await User.find();
    console.log(`Found ${users.length} users in the database.`);

    const usersWithDistance = users
      .map(user => {
        const distance = haversineDistance(lat, lon, user.latitude, user.longitude);
        console.log(`User ${user.name} is ${distance.toFixed(2)} km away.`);
        return {
          ...user.toObject(),
          distance,
        };
      })
      .filter(user => {
        const isWithinRadius = user.distance <= 10;
        if (!isWithinRadius) {
          console.log(`User ${user.name} is filtered out (distance: ${user.distance.toFixed(2)} km).`);
        }
        return isWithinRadius;
      })
      .sort((a, b) => a.distance - b.distance);

    const startIndex = (page - 1) * limit;
    const paginatedUsers = usersWithDistance.slice(startIndex, startIndex + limit);

    res.json(paginatedUsers);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { findUsers };
