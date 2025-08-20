import { 
    useBlockProps, 
    RichText 
} from '@wordpress/block-editor';

const Save = (props) => {
    const { attributes } = props;
    const { title, subtitle, buttonText, buttonUrl, backgroundColor, textColor } = attributes;

    const blockProps = useBlockProps.save({
        style: {
            backgroundColor: backgroundColor,
            color: textColor
        }
    });

    return (
        <div {...blockProps}>
            <div className="hero-content">
                <RichText.Content
                    tagName="h2"
                    className="hero-title"
                    value={title}
                />
                
                <RichText.Content
                    tagName="p"
                    className="hero-subtitle"
                    value={subtitle}
                />
                
                {buttonText && (
                    <a href={buttonUrl} className="hero-button">
                        <RichText.Content value={buttonText} />
                    </a>
                )}
            </div>
        </div>
    );
};

export default Save;