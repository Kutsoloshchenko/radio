"""Module that governs uses of music and streaming"""

import vlc
from random import choice
import os
import time

MUSIC_DIR = "./static/music/"


class RadioPlayer:
    """Class that creates and provides access to music stream"""

    def __init__(self):
        """Initialize music player object"""

        self._instance = vlc.Instance()
        self._options = 'sout=#duplicate{dst=http{mux=mp3,dst=134.132.200.153/stream.mp3,port=8080},dst=display}'
        self._music = os.listdir(MUSIC_DIR)
        self._played_music = []
        self._player = self._instance.media_player_new()
        self._current_song = "default"

        self._start_song()

    def _select_song(self):
        """method to select next song"""

        selected_song = choice(self._music)
        self._played_music.append(selected_song)
        self._music.remove(selected_song)

        if len(self._played_music) > 15:
            self._music.append(self._played_music[0])
            self._played_music.remove(self._played_music[0])

        with open(os.path.join("./temp.temp"), "w") as file:
            # Writes the current name to a temp file that can be accessed by other programs
            file.write(selected_song)

        return MUSIC_DIR+selected_song

    def song_finished(self):
        """Checks if song is playing, and if not - starts a new song"""
        if not self._player.is_playing():
            self._start_song()
            time.sleep(2)

    def _start_song(self):
        """starts a new song with a random song"""
        self._player.set_media(
            self._instance.media_new(self._select_song(), self._options))

        self._player.play()


if __name__ == "__main__":

    player = RadioPlayer()
    time.sleep(2)

    while True:
        player.song_finished()
