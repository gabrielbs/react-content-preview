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
 - #### url: PropTypes.string,
  A string with the site URL to preview
 - #### linkTo: PropTypes.func,
  A render prop function with getPreview() and cleanPreview() functions
 - #### previewContainer: PropTypes.func,
  A render prop function with the generated printscreen image available on previewImg property
 - #### loader: PropTypes.func,
  A render prop function triggered when is loading
 - #### proxy: PropTypes.string,
  A optional proxy URL to prevent CORS errors. The default value is https://cors-anywhere.herokuapp.com/
 - #### errorMessage: PropTypes.string
  A error message in case of failure on fetch
