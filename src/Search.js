import React, { Component } from "react";
import "./bootstrap.css";
import "./App.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      track: "",
      artist: "",
      lyrics: "",
      results: []
    };
  }
  onChangeTrack = e => {
    e.preventDefault();
    this.setState({
      track: e.target.value
    });
  };
  onChangeArtist = e => {
    e.preventDefault();
    this.setState({
      artist: e.target.value
    });
  };
  onChangeLyrics = e => {
    e.preventDefault();
    this.setState({
      lyrics: e.target.value
    });
  };

  search = e => {
    e.preventDefault();
    const search = `/#/search/{"track": "${this.state.track}", "artist": "${
      this.state.artist
    }", "lyrics": "${this.state.lyrics}"}/`;
    window.location.href = search;
  };
  render() {
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            background: "orange",
            padding: "30px 0 0 0",
            marginBottom: "0px"
          }}
        >
          Search for a Track
        </h1>
        <form
          onSubmit={this.search}
          className="form-group"
          style={{ marginBottom: "2px" }}
        >
          <div
            style={{
              align: "center",
              background: "orange",
              marginBottom: "0px"
            }}
          >
            <div
              className="input-group input-group-lg"
              style={{
                width: "auto",
                padding: "30px 30px 0 30px",
                align: "center"
              }}
            >
              <div className="input-group-prepend" style={{ display: "block" }}>
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Track
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                align="middle"
                onChange={this.onChangeTrack}
              />
            </div>
            <div
              className="input-group input-group-lg"
              style={{
                width: "auto",
                padding: "15px 30px 0 30px",
                align: "center"
              }}
            >
              <div className="input-group-prepend" style={{ display: "block" }}>
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Artist
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                align="middle"
                onChange={this.onChangeArtist}
              />
            </div>

            <div
              className="input-group input-group-lg"
              style={{
                width: "auto",
                padding: "15px 30px 15px 30px",
                align: "center"
              }}
            >
              <div className="input-group-prepend" style={{ display: "block" }}>
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Lyrics
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                align="middle"
                onChange={this.onChangeLyrics}
              />
            </div>
            <div
              style={{
                margin: "auto",
                padding: "0px 10px 10px",
                align: "center",
                textAlign: "center"
              }}
            >
              <button
                onClick={this.search}
                type="button"
                className="btn btn-primary"
                style={{
                  margin: "auto",
                  padding: "10px 30px",
                  align: "center"
                }}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
