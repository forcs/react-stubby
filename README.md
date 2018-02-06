# React Stubby

A tiny library that supports content distribution for react component.

## Installation

```shell
# npm
npm i react-stubby -S

#yarn
yarn add react-stubby
```

## Usage

Like [Slots](https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots) on Vuejs, very simple. Talk is cheap, show you code.

### Component Style

:point_up: Post.js

```javascript
import React from 'react'
import {
  StubContextProvider,
  Stub
} from 'react-stubby'

export default () => (
  <StubContextProvider>
    <div>
      <Stub name="title" />
      <Stub />
    </div>
  </StubContextProvider>
)
```

:v: App.js

```javascript
import React from 'react'
import {
  Stub
} from 'react-stubby'
import Post from './Post'

const { AddOn } = Stub
const App = () => (
  <div className="main">
    <Post>
      <AddOn stub="title"><h3>post title</h3></AddOn>
      <AddOn>
        <div className="post-content">
          <p>first section content...</p>
          <p>second section content...</p>
          <p>lastest section content...</p>
        </div>
      </AddOn>
    </Post>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

:ok_hand: :dizzy::dizzy::dizzy:

```html
<!-- output: -->
<div class="main">
  <div>
    <h3>post title</h3>
    <div className="post-content">
      <p>first section content...</p>
      <p>second section content...</p>
      <p>lastest section content...</p>
    </div>
  </div>
</div>
```

### HoC Style

How to code if based on HoC?

Post.js

```javascript
import React from 'react'
import {
  StubProvider,
  Stub
} from 'react-stubby'

export default StubProvider(() => (
  <div>
    <Stub name="title" />
    <Stub />
  </div>
))
```

App.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {
  StubConsumer
} from 'react-stubby'
import Post from './Post'

// !!!
const Title = StubConsumer('title')(() => (
  <h3>post title</h3>
))

// !!!
const Content = StubConsumer()(() => (
  <div className="post-content">
    <p>first section content...</p>
    <p>second section content...</p>
    <p>lastest section content...</p>
  </div>
))

const App = () => (
  <div className="main">
    <Post>
      <Title />
      <Content />
    </Post>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

That is it.

### ES6

Post.js

```javascript
import React from 'react'
import {
  StubProvider,
  Stub
} from 'react-stubby'

@StubProvider
export default class Post extends React.Component {
  render = () => (
    <div>
      <Stub name="title" />
      <Stub />
    </div>
  )
}
```

App.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {
  StubConsumer
} from 'react-stubby'
import Post from './Post'

@StubConsumer('title')
class Title extends React.Component {
  render = () => (
    <h3>post title</h3>
  )
}

@StubConsumer()
class Content extends React.Component {
  render = () => (
    <div className="post-content">
      <p>first section content...</p>
      <p>second section content...</p>
      <p>lastest section content...</p>
    </div>
  )
}

const App = () => (
  <div className="main">
    <Post>
      <Title />
      <Content />
    </Post>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

### Place Holder

Post.js

```javascript
export default StubProvider(() => (
  <div>
    <Stub name="title" />
    <Stub>
      <div className="post-content-empty">Content is not found:(</div>
    </Stub>
  </div>
))
```

App.js

```javascript
const { AddOn } = Stub
const App = () => (
  <div className="main">
    <Post>
      <AddOn stub="title"><h3>post title</h3></AddOn>
    </Post>
  </div>
)
```

```html
<!-- output: -->
<div class="main">
  <div>
    <h3>post title</h3>
    <div className="post-content-empty">
      Content is not found:(
    </div>
  </div>
</div>
```

## API

### `StubProvider(WrappedComponent)`

A Higher-Order Component for providing the Stub's context.

### `StubConsumer(name:String)(WrappedComponent)`

A Higher-Order Component for adding real components on the stub which special name or default.

```javascript
// named stub
const AddOn = StubConsumer('stub-name')(
  () => (
    <div>real content</div>
  )
)
// default stub
const AddOn = StubConsumer()(
  () => (
    <div>real content</div>
  )
)
```

### `<StubContextProvider />`

A react component for providing the Stub's context.

### `<Stub />`

A react component for defining stub.

#### props

- **name**: defining name for stub
- **children**: placehold

### `<Stub.AddOn />`

A react component for adding real components on the stub which special name or default.

#### props

- **stub**: specified the stub for add-on by name
- **children**: real content

## LICENSE

MIT
