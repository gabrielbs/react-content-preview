# react-content-preview

## Usage

```
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
