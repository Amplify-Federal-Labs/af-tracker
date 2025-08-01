import MarkdownPreview from '@uiw/react-markdown-preview';

interface PreviewProps {
    source: string;
}

const Preview = ({ source }: PreviewProps) => {
    return (
        <MarkdownPreview source={source} style={{ padding: 16 }} />
    )
}

export default Preview;
