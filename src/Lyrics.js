import React from "react";
import Axios from "axios";
import { api_key } from "./config.json";

export default class Lyrics extends React.Component {
  state = {
    name: "",
    lyrics: []
  };
  async componentDidMount() {
    const id = this.props.routerProps.match.params.id;
    let name = await Axios.get(
      `https://api.musixmatch.com/ws/1.1/track.get?apikey=${api_key}&commontrack_id=${id}`
    );
    name = name.data;
    if (name.message.header.status_code !== 200) return;
    name = name.message.body.track.track_name;
    this.setState({ name });

    let res = await Axios.get(
      `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${api_key}&commontrack_id=${id}`
    );
    res = res.data;
    if (res.message.header.status_code !== 200) return;
    this.setState({
      lyrics: res.message.body.lyrics.lyrics_body.split("\n")
    });
  }

  listLyrics = () => {
    return this.state.lyrics.map((l, i) => <p key={i}>{l}</p>);
  };

  render() {
    const lyrics = this.listLyrics();
    return (
      <div>
        <div className="jumbotron text-center" style={{ marginBottom: "0px" }}>
          <h1 style={{ marginBottom: "20px" }}>{this.state.name} </h1>
          {lyrics !== "" ? lyrics : "No Lyrics Found for this Song"}
        </div>
      </div>
    );
  }
}
