---
title: 什么是Redux
date: 2021-10-13
slug: 简介
description: aaa
cover_img: 1.jpg
---

# 什么是Redux

Redux 的基本思想：应用中使用集中式的全局状态来管理，并明确更新状态的模式，以便让代码具有可预测性。

Redux 的期望是状态immutable式的更新，即时通过复制并向复制体操作的方法来更新。



## 基本概念



### action

​	action可以理解为通知Redux更新的一个事件，它包含两个参数`type`和`payload`

```jsx
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

type字段格式为`域/事件`，payload是其它的附加信息。





#### Action Creator

**action creator** 是一个创建并返回一个 action 对象的函数。它的作用是让你不必每次都手动编写 action 对象：

```jsx
const addTodo = text => {
  return {
   type: 'todos/todoAdded',
   payload: text
  }
}
```





#### Reducer

**reducer** 是一个函数，接收当前的 `state` 和一个 `action` 对象，必要时决定如何更新状态，并返回新状态。函数签名是：`(state, action) => newState`。 **你可以将 reducer 视为一个事件监听器，它根据接收到的 action（事件）类型处理事件。**





### Store

当前 Redux 应用的状态存在于一个名为 **store** 的对象中。

store 是通过传入一个 reducer 来创建的，并且有一个名为 `getState` 的方法，它返回当前状态值：

```jsx
import { configureStore } from '@reduxjs/toolkit'



const store = configureStore({ reducer: counterReducer })



console.log(store.getState())

// {value: 0}
```





#### Dispatch

Redux store 有一个方法叫 `dispatch`。**更新 state 的唯一方法是调用 `store.dispatch()` 并传入一个 action 对象**。 store 将执行所有 reducer 函数并计算出更新后的 state，调用 `getState()` 可以获取新 state。

```jsx
store.dispatch({ type: 'counter/increment' })

console.log(store.getState())

// {value: 1}
```



**dispatch 一个 action 可以形象的理解为 "触发一个事件"**。发生了一些事情，我们希望 store 知道这件事。 Reducer 就像事件监听器一样，当它们收到关注的 action 后，它就会更新 state 作为响应。

我们通常调用 **action creator** 来调用 action：

```jsx
const increment = () => {
  return {
    type: 'counter/increment'
  }
}

store.dispatch(increment())

console.log(store.getState())

// {value: 2}
```



#### Selector[#](https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts#selector)

**Selector** 函数可以从 store 状态树中提取指定的片段。随着应用变得越来越大，会遇到应用程序的不同部分需要读取相同的数据，selector 可以避免重复这样的读取逻辑：

```jsx
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())

console.log(currentValue)

// 2
```

