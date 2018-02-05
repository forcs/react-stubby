# React Stub

A tiny library that supports slot for react component.

## Installation

```shell
# npm
npm i react-stub -S

#yarn
yarn add react-stub
```

## Usage

Very easy.

### Component Style

Post.js

```javascript
import React from 'react'
import {
  StubProvider,
  Stub
} from 'react-stub'

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
import {
  Stub
} from 'react-stub'
import Post from './Post'

const { AddOn } = Stub
const App = () => (
  <div className="main">
    <Post>
      <AddOn stub="title"><h3>post title</h3></AddOn>
      <AddOn>
        <p>first section content...</p>
        <p>second section content...</p>
        <p>lastest section content...</p>
      </AddOn>
    </Post>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

:dizzy::dizzy::dizzy:

### HoC Style

Post.js

```javascript
import React from 'react'
import {
  StubProvider,
  Stub
} from 'react-stub'

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
} from 'react-stub'
import Post from './Post'

const Title = StubConsumer('title')(() => (
  <h3>post title</h3>
))

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

// output
// <div class="main">
//   <div>
//     <h3>post title</h3>
//     <div className="post-content-empty">
//       Content is not found:(
//     </div>
//   </div>
// </div>
```

## API

### StubProvider

A Higher-Order Component for providing the Stub's context

### StubConsumer

A Higher-Order Component for adding real components on the stub which special name or default

```javascript
// named stub
const AddOn = StubConsumer('stub-name')(() => (<div>real content</div>))

// default stub
const AddOn = StubConsumer()(() => (<div>real content</div>))
```

### Stub

A component for defining stub

#### props

- name: defining name for stub

### Stub.AddOn

A component for adding real components on the stub which special name or default

#### props

- stub: specified the stub for add-on by name
