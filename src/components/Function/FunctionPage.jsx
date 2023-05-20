import { useState } from 'react';
import { Input, Typography, Box } from '@mui/material'
import React from 'react'
import { Form } from 'react-router-dom';

import openaiConfig from '../../app/openaiApiConfig';

import Loading from '../others/isLoading/Loading';
import ColorPicker from './ColorPicker';

function Caption(text) {
  return (
    <Typography variant='h4'
      sx={{
        margin: '2px',
        fontFamily: 'monospace',
        textAlign: 'right'
      }}
    >{text}</Typography>
  )
}

async function queryOpenaiComple(queryContent) {
  const queryPath = `${openaiConfig.basePath}/completions`

  if (queryContent.prompt.trim() == "") {
    throw "invalid empty input"
  }

  let res;
  try {
    res = await fetch(queryPath, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiConfig.apiKey}`
      },
      body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": queryContent.prompt || "say hello",
        "temperature": 0.2
      })
    })
  } catch (e) {
    console.error(e.message);
  }
  return res.json();
}

async function queryOpenaiChat(queryContent) {
  const queryPath = `${openaiConfig.basePath}/chat/completions`

  if (queryContent.prompt.trim() == "") {
    throw "invalid empty input"
  }

  let res;
  try {
    res = await fetch(queryPath, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiConfig.apiKey}`
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": queryContent.prompt }] || "say hello",
        "temperature": 0.2
      })
    })
  } catch (e) {
    console.error(e.message);
  }
  return res.json();
}

export default function FunctionPage() {
  let [value, setValue] = useState("");
  let [result, setResult] = useState("Ready to go");

  let querySubmit = async (e) => {
    setResult(-1)
    try {
      let res = await queryOpenaiChat({ prompt: value });
      setResult(res.choices[0].message.content);
      setValue("");
    }catch(e){
      setResult(`ERROR:${e.message}`)
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gap: '10px'
      }}
    >
      <Box id="chatgpt-content"
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "right",
          border: "1px solid black",
          paddingTop: '5px',
        }}
      >
        {Caption('CHATGPT')}
        <Form onSubmit={querySubmit}>
          <Input placeholder='sth to describe' id="prompt-input" value={value} onChange={(e) => { setValue(e.target.value) }}
            sx={{
              minWidth: "300px"
            }}
          />
          <Input type="submit" />
        </Form>
        <Box sx={{
          backgroundColor: "rgb(226, 218, 208)",
          padding: "5px"
        }}>
          {result == -1 ? <Loading /> : <Typography variant="body1"
            sx={{
              textAlign: "left"
            }}
          >{result}</Typography>}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          paddingTop: '5px',
        }}
      >
        <Box>
          {Caption('COLORPICKER')}
          <ColorPicker />
        </Box>
      </Box>
    </Box>
  )
}
