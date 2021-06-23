import React, { Component } from "react";
import { Img } from "react-image";
import "./index.scss";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import store from "./store";
import { connect } from "react-redux";
import { fetchPosts } from "./actions/postActions";
import Collapsible from "react-collapsible";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { Sort: false };
  }
  handleSort = () => {
    this.setState({ Sort: !this.state.Sort });
  };
  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  mapData = () => {
    console.log(this.props.posts);
    if (this.props.posts.length <= 0) {
      return <div> Loading....</div>;
    } else {
      return this.props.posts.slice(1, 2).map((data, i) => {
        return (
          <div key={i} className="cardWrap">
            {data.items
              .sort(
                this.state.Sort === true
                  ? (a, b) => a.rank - b.rank
                  : (a, b) => a.releaseDate - b.releaseDate
              )
              .map((items) => (
                <div key={items.id} className="card">
                  <div className="title">
                    <div>{items.title}</div>
                    <div>{items.rank}</div>
                  </div>

                  <Collapsible trigger="+">
                    <Img className="media" src={items.imageUrl} alt="pic" />

                    <div>
                      {" "}
                      <div className="content-date ">
                        Release Date {items.releaseDate}
                      </div >
                      <div className = "content-info">
                      {items.synopsis}
                      </div>
                    </div>
                  </Collapsible>
                </div>
              ))}
          </div>
        );
      });
    }
  };

  render() {

    return (
      <Provider store={store}>
        <div>
          <p className = "head head_div">
            TOP 5 Movies
            </p>
            <div>

              {this.state.Sort === true
                ? <p className = "p"> 'Hey you' sort me by rank</p>
                : <p  className = "p">'Hey you' sort me by release Date</p>}
            <button className = "button" onClick={this.handleSort}>sort me</button>
          </div>
          {this.mapData()}
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object,
};

const mapStateToProps = (state) => ({
  posts: state.posts.items,
  newPost: state.posts.item,
});

export default connect(mapStateToProps, { fetchPosts })(App);
