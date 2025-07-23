const clientId = 'c6dbd297';

export const fetchTracks = async () => {
  try {
    const response = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&order=popularity_total&include=musicinfo`
    );

    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();

    // Преобразуем данные в нужный формат
    return (
      data.results.map((track) => ({
        id: track.id,
        trackName: track.name,
        artistName: track.artist_name,
        trackAudio: track.audio,
        trackImage: track.album_image || track.image,
        duration: track.duration,
        releaseData: track.releasedate || '2023-01-01',
      })) || []
    );
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};

export const formatTrackTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};
