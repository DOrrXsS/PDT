function Fbtn(string, usage, content,) {
    this.string = string;
    this.usage = usage;
    this.content = content;
    this.isLast = true;
    if (typeof (usage) == 'object') {
        this.content = usage;
        this.isLast = false;
        this.usage = new Function();
    }
}

/**
 * @abstract: map obj to React components
 * @param Fbtn 
 * @returns React component
 */
function parseFbtn(fbtn) {
    if (fbtn.constructor == Array) {
        return fbtn.map((content) => parseFbtn(content))

    } else {
        if (fbtn.isLast) {
            return (
                fbtn.usage ? <StyledButton onClick={fbtn.usage}>{fbtn.string}</StyledButton> : <StyledButton disabled>{fbtn.string}</StyledButton>
            )
        } else {
            return (
                <StyledBox>
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 'subtitle2'
                        }}
                    >{fbtn.string}</Typography>
                    {parseFbtn(fbtn.content)}
                </StyledBox>
            )
        }
    }
}



const urlsSettings = new Fbtn('URLSETTING', [
    new Fbtn('manage', () => {

    }),
    new Fbtn('export', () => {

    }),
    new Fbtn('import', () => {

    }),
    new Fbtn('delete', () => [

    ])
]);

const postsSettings = new Fbtn('BLOGSETTING', [
    new Fbtn('12')
]);

const settingsIndex = [urlsSettings, postsSettings];

export default settingsIndex;