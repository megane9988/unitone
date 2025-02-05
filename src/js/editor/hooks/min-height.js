import { hasBlockSupport } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { cleanEmptyObject } from './utils';

export function useIsMinHeightDisabled( { name: blockName } = {} ) {
	return ! hasBlockSupport( blockName, 'unitone.minHeight' );
}

export function MinHeightEdit( props ) {
	const {
		attributes: { unitone },
		setAttributes,
	} = props;

	return (
		<TextControl
			label={
				<>
					{ __( 'Min height', 'unitone' ) } : <code>min-height</code>
				</>
			}
			value={ unitone?.minHeight }
			onChange={ ( newValue ) => {
				const newUnitone = {
					...unitone,
					minHeight: newValue,
				};

				setAttributes( {
					unitone: cleanEmptyObject( newUnitone ),
				} );
			} }
		/>
	);
}

export function saveMinHeightProp( extraProps, blockType, attributes ) {
	if ( ! hasBlockSupport( blockType, 'unitone.minHeight' ) ) {
		return extraProps;
	}

	if ( undefined === attributes?.unitone?.minHeight ) {
		return extraProps;
	}

	// Deprecation.
	// Blocks with data-layout have no prefix in the CSS custom property.
	if ( !! extraProps?.[ 'data-layout' ] ) {
		extraProps.style = {
			...extraProps.style,
			'--min-height': attributes?.unitone?.minHeight,
		};
		return extraProps;
	}

	extraProps.style = {
		...extraProps.style,
		'--unitone--min-height': attributes?.unitone?.minHeight,
	};

	return extraProps;
}

export function editMinHeightProp( settings ) {
	if ( ! hasBlockSupport( settings, 'unitone.minHeight' ) ) {
		return settings;
	}

	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}
		return saveMinHeightProp( props, settings, attributes );
	};

	return settings;
}
