import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import {
  Container,

} from "@material-ui/core";
type Props = {
  Url: string
}
type State = {
  curUrl: string
}
class VideoPlayer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { curUrl: props.Url }
  }

  render() {
    return (
      <Container>
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url={this.state.curUrl}
            width='100%'
            height='100%'
          />
        </div>
      </Container>
    )
  }
}

export default VideoPlayer;