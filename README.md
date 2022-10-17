# html-StyleAttacher

Attach styles to the page

## Get

### 1. Directly use `dist/StyleAttacher.js`

Just load `StyleAttacher.js` by script tag and the `StyleAttacher` is the class object.

### 2. Install from npm

```shell
npm i style-attacher
```
Then in your javascript code:

```javascript
import StyleAttacher from 'style-attacher'
```

## Usage

```javascript
const attacher=new StyleAttacher('define an unique name');

//attach a stylesheet by <link> tag
attacher.attachStyleSheet(`
a{cursor:unset;}
span{display:block;}
`);//this method dose not always work, in this case use the next method ↓

//attach a stylesheet by <style> tag
attacher.appendStyle(`
a{cursor:unset;}
span{display:block;}
`);

//reset all attached styles
attacher.resetStyle();
```