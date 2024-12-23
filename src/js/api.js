const fetchTracks = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const url =
    'https://api.jamendo.com/v3.0/artists/tracks/?client_id=c6dbd297&format=jsonpretty&order=track_name_desc&name=we+are+fm&album_datebetween=0000-00-00_2012-01-01';

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results[0]) {
      return data.results[0].tracks;
    } else {
      console.error('Unexpected API response', data);
    }
  } catch (error) {
    console.error('An error occurred', error);
  }
};

const createTrackList = (tracks) => {
  // Проверяем, определены ли tracks перед вызовом метода map
  if (tracks) {
    const trackList = tracks.map((track) => {
      const trackImage = checkTrackImage(track.image);
      // const playPause = playTrack(track.audio);
      // console.log(track.name);
      return {
        trackId: track.track_id,
        album_name: track.album_name,
        trackName: track.name,
        artistName: track.artist_name,
        trackImage: trackImage,
        trackAudio: track.audio, //playTrack,
        trackTime: track.duration,
        releaseData: track.releasedate,
      };
    });
    return trackList;
  } else {
    console.error('No tracks to create a list from');
  }
};

fetchTracks().then((tracks) => {
  if (tracks) {
    createTrackList(tracks);
  } else {
    console.error('No tracks returned from fetchTracks');
  }
});

const checkTrackImage = (trackImage) => {
  const defaultImage = '/public/images/cover-track/3.jpg';
  return trackImage ? trackImage : defaultImage;
};

async function formatTrackTime(trackTimeInSeconds) {
  const hours = Math.floor(trackTimeInSeconds / 3600);
  const minutes = Math.floor((trackTimeInSeconds % 3600) / 60);
  const seconds = trackTimeInSeconds % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}:`;
  }

  formattedTime += `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
}

export { createTrackList, fetchTracks };
