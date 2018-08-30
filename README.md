# React Content Preview
Preview websites anyway you want using https://apileap.com/


## Demo

![](https://github.com/gabrielbs/react-content-preview/blob/master/gifexample.gif)

## Usage

```jsx
<ContentPreview
  url='http://www.twitch.tv'
  useCached={ true }
  linkTo={(props) => (
    <a
      onMouseEnter={() => props.getPreview()}
      onMouseLeave={() => props.cleanPreview()}
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
```

### Running example locally
```
npm run dev
```
Then access your localhost on port 9000 http://localhost:9000

### Props
 - #### linkTo: PropTypes.func,
 - #### previewContainer: PropTypes.func,
 - #### loader: PropTypes.func,
 - #### url: PropTypes.string,
 - #### proxy: PropTypes.string,
 - #### errorMessage: PropTypes.string
