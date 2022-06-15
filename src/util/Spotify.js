const client_id = '0e2a21bef3cf49478bafdf45323b4f72';
const redirect_uri = 'https://jammmingbymariam.surge.sh/';
let accessToken;

const Spotify = {
    getAccessToken() {
        let url = window.location.href;
        if(accessToken) {
            return accessToken;
        } else if(url.match(/access_token=([^&]*)/) &&  url.match(/expires_in=([^&]*)/)){
            //grabs the access token and the expiry time from the url
            accessToken = url.match(/access_token=([^&]*)/)[1];
            let expirationTime = url.match(/expires_in=([^&]*)/)[1];
            //sets access token to expire
            window.setTimeout(() => accessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            //access token is empty and is not in the url
            //redirect user to provide access
            window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`

        }
    },
    //fetches tracks from API and returns a formatted object containing track info
    async search(searchTerm) {
        accessToken = this.getAccessToken();
        
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await response.json();
        if (!data.tracks) {
            return [];
        }
        const tracks = data.tracks.items;
        const tracksList = tracks.map((track) => {
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            };
        });
        return tracksList;
    },
    async savePlaylist(playlistName, trackURIs) {
        if(!playlistName || !trackURIs.length) {
            return;
        }
        accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        //gets the users user id 
        const userIdResponse = await fetch(`https://api.spotify.com/v1/me`, { headers: headers })
        const userIddata = await userIdResponse.json()
        userID = userIddata.id;

        //creates a new playlist with the chosen name
        const newPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
        })

        //adds the tracks to the playlist
        const newPlaylistId = await newPlaylistResponse.json();
        let playlistID = newPlaylistId.id;
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'PUT',
            body: JSON.stringify({ uris: trackURIs }),
        }).then((response) => response.json()).then((data) => playlistID = data.id)
        
    }
};

export default Spotify;