import React from 'react';
import glamorous from 'glamorous';

import CarouselCards from 'xceed-ui/lib/CarouselCards';

const EventSelectionText = glamorous.span({
  fontSize: 22,
  width: '100%',
  textAlign: 'center',
  margin: 50,
});

const Box = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: null,
    };
  }

  filterResultData(results) {
    if (results.length === 0) {
      if (this.state.selectedEvent !== null) {
        this.state = {
          selectedEvent: null,
        };
      }
      return;
    }

    let procResults = [];

    results.forEach(result => (
      procResults.push(
        {
          id: result._source.id,
          startingTime: result._source.startingTimeAsTimestamp,
          endingTime: result._source.endingTimeAsTimestamp,
          name: result._source.name,
          cover: result._source.cloudinary_cover_image,
        }
      )
    ));

    return procResults;
  }

  handleSelect(eventId) {
    this.setState(() => ({
      selectedEvent: eventId,
    }));
  }

  render() {
    const results = this.props.results || [];

    return (
      <div>
        <hr />
        <div>
          <CarouselCards
            height={180}
            width={350}
            blockSelection={false}
            isLoading={results.length === 0}
            items={this.filterResultData(results)}
            mode={window.innerWidth > 991 ? 'physics' : 'decay'}
            timeConstant={350}
            power={0.8}
            restDelta={0.5}
            springStrength={100}
            friction={0.8}
            dateBackground={'white'}
            selected={false}
            onEventSelect={eventId => this.handleSelect(eventId)}
          />
        </div>
        {this.state.selectedEvent !== null &&
          <Box>
            <EventSelectionText>{`Event ${this.state.selectedEvent} selected`}</EventSelectionText>
          </Box>
        }
      </div>
    );
  }
}


export default SearchResults;
