import React from "react";
import elasticsearch from "elasticsearch";

import Input from 'xceed-ui/lib/Input';

import SearchResults from './SearchResults';

let client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace"
});

class EsClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const search_query = event.target.value;

    client
      .search({
        q: search_query
      })
      .then(body => (
        this.setState(() => ({
          results: body.hits.hits
        }))
      ));
  }
  render() {
    return (
      <div className="container">
        <Input
          style={{ padding: '0 20px' }}
          type="text"
          onChange={this.handleChange}
        />
          <SearchResults results={this.state.results} />
      </div>
    );
  }
}

export default EsClient;


