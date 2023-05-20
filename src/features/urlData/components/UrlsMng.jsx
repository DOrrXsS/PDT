import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Input, List, ListItem, ListItemIcon, ListSubheader, Paper, Switch, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addurls, updateUrls, addurltype } from '../urlDataSlice';

import { selectUrlsData, selectUrlsStatus } from '../urlDataSlice'

import deepCopy from '../../../assets/methods/deepCopy';
import { MuiFileInput } from 'mui-file-input';


const StyledList = styled(List)(({ theme }) => ({
    width: '500px',
    height: '200px'
}))

function ClassList(props) {
    const { urlsType, copyedUrlsData } = props;
    const [open, setOpen] = useState(false);

    return (
        <FormContext.Consumer>
            {({ isDisabled, addUrlsData }) => (
                <>
                    <ListItem>
                        <TextField defaultValue={urlsType} disabled={isDisabled}
                            onBlur={(e) => {
                                copyedUrlsData[e.target.value] = copyedUrlsData[urlsType];
                                if (copyedUrlsData[urlsType]) {
                                    delete copyedUrlsData[urlsType]
                                }
                            }}
                        />
                        <ListItemIcon>
                            <AddIcon onClick={() => {
                                addUrlsData('title', 'url', urlsType);
                            }} />
                        </ListItemIcon>
                        <ListItemIcon onClick={() => { setOpen(!open) }}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemIcon>
                    </ListItem>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        {React.cloneElement(props.children)}
                    </Collapse>
                </>
            )}
        </FormContext.Consumer>
    )
}

function SingleList(props) {
    const { title, url, data } = props;

    return (
        <FormContext.Consumer>
            {({ isDisabled }) => (
                <ListItem>
                    <TextField defaultValue={title} disabled={isDisabled}
                        onChange={(e) => {
                            data.title = e.target.value
                        }}
                    />
                    <TextField defaultValue={url} disabled={isDisabled}
                        onChange={(e) => {
                            data.title = e.target.value
                        }}
                    />
                </ListItem>
            )}
        </FormContext.Consumer>
    )
}

const AddUrlType = (props) => {
    const { addUrlType } = props;

    return <Button onClick={()=>{
        var text=prompt("please input a type name")
        if(text) {
            addUrlType(text)
        }
    }}>Add</Button>
}

//create context here, every input item is able to trigger update of urlsData state.
let FormContext = React.createContext({
    isDisabled: false,
    handleClose: () => { },
    handleOpen: () => { },
    handleToggleDisable: () => { },
    urlsData: {},
    addUrlsData: () => { },
});


export default function UrlsMng() {
    const [dialog, setDialog] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    let oriUrlsData = useSelector(selectUrlsData);
    let copyedUrlsData = deepCopy(oriUrlsData);
    const urlsStatus = useSelector(selectUrlsStatus);

    const dispatch = useDispatch();

    const addUrlsData = (title, url, urlType) => {
        dispatch(addurls({ title, url, urlType }));
    }

    const addUrlType = (newUrlType) => {
        dispatch(addurltype({ newUrlType }));
    }

    const updateUrlsData = (urlsData) => {
        oriUrlsData = urlsData;
        dispatch(updateUrls({ urlsData }));
    }

    const handleClose = (urlsData) => {
        setDialog(false);
        if (urlsData) {
            updateUrlsData(urlsData);
        }
    }

    const handleOpen = () => {
        setDialog(true)
    }

    const handleExport = () => {
        var blob = new Blob([JSON.stringify(oriUrlsData, null, 2)], {
            "type": "application/json"
        });
        var a = document.createElement("a");
        a.download = 'urlsJson';
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleImport = (json) => {
        console.log(json);
        updateUrlsData(json);
    }

    const handleToggleDisable = () => {
        setIsDisabled(!isDisabled);
    }

    const handleChange = (newFile) => {
        const fileReader = new FileReader();
        fileReader.addEventListener('loadend', () => {
            try {
                let urlsJson = JSON.parse(fileReader.result)
                if (confirm("确认导入文件,目前数据将被覆盖")) {
                    handleImport(urlsJson);
                }
            } catch (err) {
                alert("文件格式错误");
            }
        });
        fileReader.readAsText(newFile);
    }

    let whatToDiaplay = () => {
        //get index of urlsdata
        const entries = Object.entries(copyedUrlsData).map(x => x[0]);

        if (urlsStatus == 'success') {

            return (
                <FormContext.Provider value={{ isDisabled, handleToggleDisable, handleClose, handleOpen, copyedUrlsData, addUrlsData }} >
                    <Box>
                        <AddUrlType addUrlType={addUrlType} />

                        <StyledList>

                            {entries.map((urlsType, index) =>

                                <ClassList key={index} urlsType={urlsType} copyedUrlsData={copyedUrlsData}>

                                    <List>
                                        {copyedUrlsData[urlsType].map((data, index) => (
                                            <SingleList key={index} url={data.url} title={data.title} data={data} />
                                        ))}
                                    </List>

                                </ClassList>


                            )}
                        </StyledList>
                    </Box>
                </FormContext.Provider>
            )

        }
        return <Typography>loading data</Typography>
    }


    let SelectFile = () => {
        const [selectedFile, setSelectedFile] = useState(null);

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);
            handleChange(file)
        };

        return (
            <div>
                <Input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-input"
                />
                <label htmlFor="file-input">
                    <Button component="span">
                        {selectedFile ? (
                            <Typography>{selectedFile.name}</Typography>
                        ) : (
                            'Choose a file'
                        )}
                    </Button>
                </label>
            </div>
        );
    }
    return (
        <Box
            sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Button onClick={handleOpen}>MANAGE</Button>

            <Button onClick={handleExport}>EXPORT</Button>

            <SelectFile />

            <Dialog open={dialog} onClose={() => { handleClose(oriUrlsData) }}>

                <DialogTitle>
                    <Typography>URL MANAGE</Typography>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Switch checked={!isDisabled} onChange={handleToggleDisable} />
                    </Box>
                    <Box>
                        {React.cloneElement(whatToDiaplay())}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => { handleClose(copyedUrlsData) }}>confirm</Button>
                    <Button onClick={() => { handleClose(oriUrlsData) }}>cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

