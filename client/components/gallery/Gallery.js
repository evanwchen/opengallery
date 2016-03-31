import React from 'react'
import { Motion, spring } from 'react-motion'
import Tile from '../tile/Tile'
import GalleryTile from './GalleryTile'
import Wordmap from '../wordmap/Wordmap'
import Feedback from '../wordmap/Feedback'

const config = {stiffness: 170, damping: 26}

export default class Gallery extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: {} }
  }

  componentWillMount (nextProps) {
    this.resizeGallery(nextProps)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.navigateGallery)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.navigateGallery)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.displayGallery) {
      this.resizeGallery(nextProps)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.displayGallery;
  }

  navigateGallery = ({ keyCode }) => {
    if (keyCode === 27 || keyCode > 36 && keyCode < 41) {
      const { nextTile, prevTile, hideGallery, showWordmap, hideWordmap } = this.props
      switch (keyCode) {
        case 37: // left arrow
          prevTile()
          break
        case 38: // up arrow
          showWordmap()
          break
        case 39: // right arrow
          nextTile()
          break
        case 40: // down arrow
          hideWordmap()
          break
        case 27: // esc key
          hideGallery(0)
          break
        default:
        return
      }
    }
  }

  resizeGallery ({ data }) {
    const vw = window.innerWidth * 0.9
    const vh = window.innerHeight * 0.9
    const resizedData = Object.assign({}, data)

    for (let [media_id, { width, height }] of Object.entries(resizedData)) {
      if () {
        console.log('media_id:', media_id)
        console.log('width:', width)
        console.log('height:', height)
      }
    }
  }

  render () {
    const { tile, grid, data, displayWordmap, hideGallery, userId, submitInput } = this.props
    const tileWidth = data[grid[tile]].width
    const tileHeight = data[grid[tile]].height
    const tilePhoto = data[grid[tile]].url_lg || data[grid[tile]].url_md

    const widths = grid.map(i => tileHeight / data[i].height * data[i].width)

    const start = widths.slice(0, tile)
    .reduce((sum, width) => sum - width, 0);

    let gallery = []
    grid.reduce((left, undefined, i) => {
      gallery.push({
        left: spring(left, config),
        height: spring(tileHeight, config),
        width: spring(widths[i], config)
      })
      return left + widths[i]
    }, start)

    return (
      <div id="gallery-component" onClick={() => hideGallery(tile)}>
        <Motion style={{height: spring(tileHeight), width: spring(tileWidth)}}>
          { container =>
            <div
              className="gallery-tile"
              style={container}
              onClick={() => hideGallery(tile)}
            >
              { gallery.map((style, i) =>
                <Motion key={i} style={style}>
                  { style =>
                    <Tile
                      style={style}
                      url={data[grid[i]].url_lg}
                      data={data[grid[i]]}
                      handleClick={() => hideGallery(tile)}
                    >
                      <GalleryTile data={data[grid[i]]}/>
                    </Tile>
                  }
                </Motion>
              )}
              { displayWordmap ?
                <Wordmap
                  tile={tile}
                  media={data[grid[tile]]}
                  displayWordmap={displayWordmap}
                  userId={userId}
                  submitInput={submitInput}
                >
                  <Feedback
                    user={userId}
                    data={grid[tile]}
                    submit={submitInput}
                  />
                </Wordmap>
              : '' }
            </div>
          }
        </Motion>
      </div>

    )
  }
}
