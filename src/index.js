import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    RichText, 
    InspectorControls,
    ColorPalette,
    PanelColorSettings 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    Button,
    ToggleControl 
} from '@wordpress/components';


// Register the block (metadata comes from block.json)
registerBlockType('simple-custom-block/hero-section', {

    edit: (props) => {
        const { attributes, setAttributes } = props;
        const { title, subtitle, buttonText, buttonUrl, backgroundColor, textColor } = attributes;
        const blockProps = useBlockProps({
            style: {
                backgroundColor: backgroundColor,
                color: textColor,
                padding: '40px',
                borderRadius: '8px',
                textAlign: 'center'
            }
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Hero Settings', 'simple-custom-block')}>
                        <TextControl
                            label={__('Button URL', 'simple-custom-block')}
                            value={buttonUrl}
                            onChange={(value) => setAttributes({ buttonUrl: value })}
                        />
                    </PanelBody>
                    
                    <PanelColorSettings
                        title={__('Color Settings', 'simple-custom-block')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (value) => setAttributes({ backgroundColor: value || '#f8f9fa' }),
                                label: __('Background Color', 'simple-custom-block'),
                            },
                            {
                                value: textColor,
                                onChange: (value) => setAttributes({ textColor: value || '#333333' }),
                                label: __('Text Color', 'simple-custom-block'),
                            }
                        ]}
                    />
                </InspectorControls>

                <div {...blockProps}>
                    <div className="hero-content">
                        <RichText
                            tagName="h2"
                            className="hero-title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Enter title...', 'simple-custom-block')}
                            style={{
                                fontSize: '2.5rem',
                                marginBottom: '1rem',
                                fontWeight: 'bold'
                            }}
                        />
                        
                        <RichText
                            tagName="p"
                            className="hero-subtitle"
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Enter subtitle...', 'simple-custom-block')}
                            style={{
                                fontSize: '1.2rem',
                                marginBottom: '2rem',
                                opacity: 0.8
                            }}
                        />
                        
                        <RichText
                            tagName="span"
                            className="hero-button-text"
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                            placeholder={__('Button text...', 'simple-custom-block')}
                            style={{
                                display: 'inline-block',
                                padding: '12px 24px',
                                backgroundColor: textColor,
                                color: backgroundColor,
                                borderRadius: '4px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        />
                    </div>
                </div>
            </>
        );
    },

    save: (props) => {
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
    },
});
