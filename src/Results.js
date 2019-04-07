import React from "react";
import Axios from "axios";
import { api_key } from "./config.json";
import { Link } from "react-router-dom";

export default class Results extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      page: 1,
      sentRequest: false
    };
  }

  track = "";
  artist = "";
  lyrics = "";
  scroll = 0;

  componentDidMount = async () => {
    this.reload();
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("hashchange", this.reload);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("hashchange", this.reload);
  }

  async getResults(page) {
    let res = await Axios.get(
      `https://api.musixmatch.com/ws/1.1/track.search?apikey=${api_key}&q_track=${
        this.track
      }&q_artist=${this.artist}&q_lyrics=${
        this.lyrics
      }&s_track_rating=desc&page_size=20&page=${page}`
    );
    res = res.data;
    return res;
  }

  reload = async () => {
    const { track, artist, lyrics } = JSON.parse(this.props.match.params.track);
    this.track = track;
    this.artist = artist;
    this.lyrics = lyrics;
    let res = await this.getResults(this.state.page);
    if (res.message.header.status_code !== 200) return;
    res = res.message.body.track_list;
    this.setState({
      results: res
    });
  };

  onScroll = async () => {
    this.scroll =
      document.body.scrollHeight - window.innerHeight - window.scrollY;
    if (this.state.sentRequest) return;
    if (this.scroll < 100) {
      this.setState({
        page: this.state.page + 1,
        sentRequest: true
      });
      let res = await this.getResults(this.state.page);
      if (res.message.header.status_code !== 200) {
        this.setState({
          page: this.state.page - 1
        });
        return;
      }
      res = res.message.body.track_list;
      const newRes = [...this.state.results, ...res];
      this.setState({
        results: newRes
      });
    }
    this.setState({
      sentRequest: false
    });
  };

  placeList = () => {
    const list = this.state.results.map((c, i) => {
      const link = `/lyrics/${c.track.commontrack_id}`;

      return (
        <div
          className="list-group-item list-group-item-action flex-column align-items-start active"
          key={i}
          style={{ borderBottom: "2px solid white", marginTop: "0px" }}
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{c.track.track_name}</h5>
            <small>
              <Link
                to={link}
                style={{
                  color: "black",
                  backgroundColor: "orange",
                  padding: "5px"
                }}
              >
                View Lyrics
              </Link>
            </small>
          </div>
          <p className="mb-1">
            Artist: {c.track.artist_name}
            <br />
            Album: {c.track.album_name}
          </p>
          <small>{c.track.updated_time}</small>
        </div>
      );
    });
    return list;
  };

  render() {
    const list = this.placeList();
    return (
      <div className="list-group" id="search-list">
        {list}
      </div>
    );
  }
}
