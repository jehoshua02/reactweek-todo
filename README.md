Mini Project 1: Todo List
============

##Objectives
The purpose of this Mini Project is to get you used to getting started from scratch with React and Webpack. You'll be building a very basic [Todo App](http://reactweek.com/projects/mini-todolist) in React. This app should be the perfect introduction to the material that was covered earlier. This app will have multiple components, some of those components will have their own state, you'll be passing data down as props, and you'll have your own events.

###Step 1: Create the Structure for Your Application
* Go ahead and create a folder structure that looks like this including the files. (If you're opinionated about your folder structure, feel free to experiment what works best for you).
```
├── webpack.config.js
├── app/
│   ├── AddItem.js
│   ├── App.js
│   ├── List.js
│   ├── ListContainer.js
├── public/
│   ├── index.html
```
Notice we haven't included any CSS. Because this project is rather small (and because the project later today is going to build off of this one so we're going for maximum composition), all of my CSS is going to be JavaScript Objects which live inside the component which is using that specific style.
* Now that your folder structure is set up, let's go ahead and interactively create a package.json file so we can specify which npm packages we'll need in our app. *If you are unfamiliar with NPM, flag down a mentor and we'll come over and expound on this topic*.
* cd over to the root of your project and run ```npm init```. This will guide you through some steps that aren't too important. Once you're done with the steps you'll have a package.json file in your root directory.

We're only going to need one dependency and two dev dependencies for our project.

* In that same root location you were at before run ```npm install --save react```. This will grab React from NPM and save it into a newly created node_modules folder in the root of your directory. This also tells your package.json file that React is a dependency that's necessary for the app to run.
* Once again in the same root directory run ```npm install --save-dev webpack``` and ```npm install --save-dev jsx-loader``` these commands will install webpack and jsx-loader inside our node_modules folder while letting our package.json file know that both of these are developer dependencies that are required while in development but not to run the live app.
* Now what we're going to do is save ```webpack``` globally so we can run the actual webpack command in the terminal. Head over to your terminal and run ```npm install -g webpack``` to save webpack as a global module on your system.

Now that the basic skeleton of our app is ready, let's head over to our ```webpack.config.js``` file and fill that out.


###Step 2: Configuring Webpack
As we talked about in the lecture, Webpack is a super powerful tool that can do a lot. Starting out though, we'll just use Webpack to transform our JSX to JS.

We're going to give our Webpack config file three things.
  - The entry point where our main parent component is located.
  - Our JSX loader which will do the converting from JSX to JS
  - An output path of where to put our new bundled/transformed React code.

* Head over to your webpack.config.js file and add the following code.
```javascript
module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
```
Note that our file structure is set up in such a way that our ```app``` folder will be used for our React components and webpack will take those components, transform them, bundle them, and output them to our public folder where our ```index.html``` file is located.

###Step 3: Our First Component
* Head over to your index.html page and add the following code.
```html
<!DOCTYPE html>
<html>
  <head>
    <title>React Bootstrap Todo List</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```
Notice it's pretty normal. We've included bootstrap and we've added an element with an id of app. We'll render our App component to this html element later in our App.js file.

Before we start building our app, let's head over to our App.js file and create our first component in order to make sure everything is working correctly.

* In App.js require 'react' and save it into a variable called React.
* Create a component that all it does is render "Hello World!" to the page and save that into a variable called ```App```
* Now, use ```React.render``` to render your ```<App />``` component to the app element in your index.html page.
* Head over to your terminal and tell webpack to build and watch your files using ```webpack -w```.
* Open up your ```index.html``` in the broowser and verify that you see ```Hello World!``` and you're getting no errors in the console.

If you are getting errors, debug. If you get stuck, flag down a mentor.

Your current App.js file should look like this.

```javascript
var React = require('react');

var App = React.createClass({
  render: function(){
    return (
      <div>
        Hello World
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)
```

###Step 4: Component Overview and List Component
Now that our build process is up and running, let's crank out the rest of our components.

We're going to be making four components all together. Here is a list of all of them with their purpose and how they fit into our app hierarchy.
```
├── App
│   ├── ListContainer
│   ├-─ ├── AddItem
│   ├-─ ├── List
```

Visually represented that looks like this.

![React Components Visualized](http://tylermcginnis.com/ReactWeek/todo-react-components.png)
The darker the red the more nested the components are.
 - App is our overall component
 - ListContainer is the component of our todolist and the list's title
 - AddItem is the component of the input box
 - List is the component of every item in the list

We're going to start out with our most child components and work our way back out. Let's first start with our AddItem component. Head over to your AddItem.js file.
* First thing, as always, is require('react'). **From here on out that step will be assumed**
* Create your AddItem component with ```React.createClass``` and then export it using ```module.exports = AddItem;``` so that we can require our AddItem component from other files later on.

The purpose of this component is it's going to keep track of its own state which is going to be just the input box value. Whenever someone types in a new value into this input box and hits enter, ```AddItem``` will invoke a method that will be passed to it from its parent component (as props) and we'll pass that method the current state of the component (or the new item we wan to add).

* use ```getInitialState``` to set an initial state of your component with a ```newItem``` property whose value is an empty string
* Create a ```handleChange``` method that is going to use ```setState``` to update ```newItem``` with whatever is in the input box
* Create a ```handleSubmit``` method that will be called on ```onKeyDown``` that checks to see if the current key pressed was the enter key (```e.keyCode === 13```) and if it was, call the ```add``` method on AddItem's props object and pass it the current state of ```newItem```. Once you invoke ```add``` then reset the newItem state to an empty string.

Now we have a few helper methods the only thing left to do is to use render to set up what the UI for this component will look and behave like.

* Create a render method that returns an opening and closing ```<div>``` tag.
* Inside the ```<div>``` create an input box with a type of ```text``` a ```className``` of ```form-control``` and whose properties are tied to the state and helper methods we created above. *hint: you'll add a ```value```, ```onKeyDown```, and ```onChange``` property to your input box.*

Check your console and see if there are any errors. If there aren't, you're good to move to the next step. What might happen is once we get everything wired up you'll discover a few bugs in your ```AddItem``` component, but you can fix those later.

Your ```AddItem.js``` file should now look like this,
```javascript
var React = require('react');

var AddItem = React.createClass({
  getInitialState: function(){
    return {
      newItem: ''
    }
  },
  handleChange: function(e){
    this.setState({
      newItem: e.target.value
    })
  },
  handleSubmit: function(e){
    if(e.keyCode === 13){
      this.props.add(this.state.newItem);
      this.setState({
        newItem: ''
      });
    }
  },
  render: function(){
    return (
      <div>
        <input type="text" 
          className="form-control" 
          value={this.state.newItem} 
          placeholder="New Item" 
          onKeyDown={this.handleSubmit} 
          onChange={this.handleChange} />
      </div>
    )
  }
});

module.exports = AddItem;
```

###Step 5: List Component

The next component we're going to build is our List component. Our List component is going to be our unordered list of every item in our todo list. Rememeber, the component which is managing the state of our list is ListComponent's parent component (ListContainer). From our ListContainer component we'll pass in the todolist as props to our List component. Our CSS will be entirely contained as an object in this component. Let's go ahead and add that now.

* Head over to  yuor ```List.js``` file.
* Create a ```render``` method. Inside that render method go ahead and add this object as a variable inside of ```render```.
```javascvript
var styles = {
  uList: {
    paddingLeft: 0,
    listStyleType: "none"
  },
  listGroup: {
    margin: '5px 0',
    borderRadius: 5
  },
  removeItem: {
    fontSize: 20,
    float: "left",
    position: "absolute",
    top: 12,
    left: 6,
    cursor: "pointer",
    color: "rgb(222, 79, 79)"
  },
  todoItem: {
    paddingLeft: 20,
    fontSize: 17
  }
};
```
This is just the styling for this component.

Now that we have our render method and basic styles, let's create an array of ```<li>``` elements that contains an X icon to delete the item and also the item's text. Usually how you would do this is to have a for loop which loops over every item in the list. With React however it's common practice to use the built in map method. All map does is it iterates over a list and returns you an array after modifying every item in that list. As mentioned earlier we'll use map to create our list of ```<li>``` tags for our list.

* create a variable called ```listItems``` as a variable inside of the render method which is going to be the result of mapping over ```this.props.items```. A few tips
  - Your ```<li>``` element will need to have a ```className``` of ```list-group-item``` a style of ```{styles.listGroup}```, and a key of ```index``` which is the index of the map you're currently iterating over and can be accessed as the second paramter of your map.
  - Inside the ```<li>``` tag you'll have two span elements. The first one will have a className of ```glyphicon glyphicon-remove``` a ```style``` attribute of ```{styles.removeItem}``` and a ```onClick``` handler which will be bound to a ```remove``` method which is going to be coming in as a prop from the parent component. You'll need to use ```bind``` and pass in ```null``` and the ```index``` from the paremeters of your map function. The second span element will have a ```style``` of ```{styles.todoItem}``` and will just have the actual ```{item}``` itself inside the span.
  - The last gotcha is that when we use map, the keyword ```this``` is no longer bound to what it was initially. In order to fix this you'll have to add ```.bind(this)``` on the end of your map invocation in order to keep the keyword ```this``` bound to what it is bound to outside of the map function.

I realize all of that was super wordy. Here's what you're List.js file should look like up to this point.

```javascript
var React = require('react');

var List = React.createClass({
  render: function(){
    var styles = {
      uList: {
        paddingLeft: 0,
        listStyleType: "none"
      },
      listGroup: {
        margin: '5px 0',
        borderRadius: 5
      },
      removeItem: {
        fontSize: 20,
        float: "left",
        position: "absolute",
        top: 12,
        left: 6,
        cursor: "pointer",
        color: "rgb(222, 79, 79)"
      },
      todoItem: {
        paddingLeft: 20,
        fontSize: 17
      }
    };
    var listItems = this.props.items.map(function(item, index){
      return (
        <li key={index} className="list-group-item" style={styles.listGroup}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.removeItem}
            onClick={this.props.remove.bind(null, index)}>
          </span>
          <span style={styles.todoItem}>
            {item}
          </span>
        </li>
      )
    }.bind(this));
  }
});

module.exports = List;
```
If you're still a little confused about map or bind and how we're using them in the code above, flag over a mentor and we'd love to help explain it in more detail.

So now we have a collection of our todolist with each item being wrapped in a ```<li>``` element, we need to display that collection after wrapping it in ```<ul style={styles.uList}>``` tags.

* return an unordered list from your render method that has a style of ```{styles.uList}``` and inside is our ```{listItems}``` collection.

That code should look like this.

```javascript
return (
  <ul style={styles.uList}>
    {listItems}
  </ul>
)
```
And the final result of the 'List' component should look like this.
```javascript
var React = require('react');

var List = React.createClass({
  render: function(){
    var styles = {...};
    var listItems = this.props.items.map(function(item, index){
      return (
        <li key={index} className="list-group-item" style={styles.listGroup}>
          <span
            className="glyphicon glyphicon-remove"
            style={styles.removeItem}
            onClick={this.props.remove.bind(null, index)}>
          </span>
          <span style={styles.todoItem}>
            {item}
          </span>
        </li>
      )
    }.bind(this));
    return (
      <ul style={styles.uList}>
        {listItems}
      </ul>
    )
  }
});

module.exports = List;
```

Again I realize this section was super wordy. If something doesn't make sense, there are mentors here to help.

###Step 6: ListContainer Component

The first thing you'll need to do is require react, our AddItem component, and our List component because we'll be rendering both of those inside our render method.

* Head over to ```ListContainer.js```
* Require react, the AddItem component, and the List component.
* Create a component called ListContainer and then use ```module.exports``` to export it at the end of the file.

```javascript
var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');

var ListContainer = React.createClass({
    //Nothing here yet
});

module.exports = ListContainer;
```

This component is going to keep track of our overall todo list array.

* use ```getInitialState``` and return a ```list``` property whose value is an empty array.

Now that our initial list is set up, we're going to have two helper methods. One called ```handleAddItem``` which takes in a new item and adds that to our ```list``` array and the other a ```handleRemoveItem``` which takes in an index and removes that specific index from our ```list``` array.

* create the ```handleAddItem``` method which takes in an item as its parameter and then resets the ```list``` state adding that new item to the list. **remember, you should treat your state as if it's immutable. Don't do this ```this.state.list.push(newItem)```, instead use ```this.setState```**.
* create a ```handleRemoveItem``` method that takes in an index then splices that index out of our ```list``` state. *again don't all splice directly on ```this.state.list```, instead create a reference to ```this.state.list``` and splice that then reset the ```list``` state with that new spliced array.*


Now that we have our helper methods set up we need to use ```render``` to specify what the UI will look like. I'll give you the intial UI at first because it's a lot of bootstrap markup then you can render the ```AddItem``` and ```List``` component.

```html
  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          {/* AddItem goes here. * Make sure you pass it the handleAddItem method we made above as 'add' */}
          {/* List goes here. * Make sure you pass it the list as 'items' and the handleRemoveItem as remove */}
        </div>
      </div>
    )
  }
```

After you get done with the above your ```ListContainer.js``` file should look like this.
```javascript
var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');

var ListContainer = React.createClass({
  getInitialState: function(){
    return {
      list: []
    }
  },
  handleAddItem: function(newItem){
    this.setState({
      list: this.state.list.concat([newItem])
    });
  },
  handleRemoveItem: function(index){
    var newList = this.state.list;
    newList.splice(index, 1);
    this.setState({
      list: newList
    })
  },
  render: function(){
    return (
      <div className="col-sm-6 col-md-offset-3">
        <div className="col-sm-12">
          <h3 className="text-center"> Todo List </h3>
          <AddItem add={this.handleAddItem}/>
          <List items={this.state.list} remove={this.handleRemoveItem}/>
        </div>
      </div>
    )
  }
});

module.exports = ListContainer;
```

###Step 7: App Component

Now is the easy part. Our App component is just going to be where we wrap our ```ListContainer``` component in a few bootstrap divs and then use ```React.render``` to render our App to our ```#app``` element.

* Require where you required ```react```, require ```ListContainer```.
* Create a render method which has two ```<divs``` one nested in the other. The parent div should have a ```className``` of ```container``` and the nested one should have a ```className``` of ```row```. That's just for our bootstrap styling
* Inside of ```row``` render the ```ListContainer``` component.

Your final App.js file should look like this.
```html
var React = require('react');
var ListContainer = require('./ListContainer');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <ListContainer />
        </div>
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)
```

That's it! If you've had webpack running head over to your browser and load the index.html page. You should have a very basic todoapp running with React.

If this mini project was a little slow for you, good. That's the point. As mentioned before, the Mini Projects are supposed to be very hand-holdy while the actual projects aren't. If you're on the opposite end and you're struggling with anything we've covered or talked about, now would be a really good time to flag down a mentor and get some extra help. We're here to help you, use us.
