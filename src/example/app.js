import React, { Component } from 'react'
import ContentPreview from '../content-preview'
import './example.css'

class App extends Component {
	render() {
		return(
			<div className='app'>
				<div className='example'>
					<ContentPreview
	          url='http://www.twitch.tv'
	          linkTo={(props) => (
	            <a
	    					onMouseEnter={() => props.getPreview()}
	    					href={props.url}>
	    					preview
	    				</a>
	          )}
	          loader={(props) => (
	            <div>loading...</div>
	          )}
	          previewContainer={(props) => (
	            <div className='preview-container'>
	    					<img src={props.previewImg} className='preview-container__img' />
	    				</div>
	          )}
	        />
				</div>
			</div>
		)
	}
}

export default App
