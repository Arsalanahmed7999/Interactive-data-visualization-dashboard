import { useAuth } from '../networks/AuthProvider';

const fetchProtectedData = async () => {
  const { authToken } = useAuth();

  try {
    const response = await fetch('http://localhost:5000/api/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Sending token in headers
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Protected data:', data);
    } else {
      console.error('Error fetching protected data');
    }
  } catch (error) {
    console.error('Error during API request:', error);
  }
};
