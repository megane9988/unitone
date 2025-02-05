/**
 * https://github.com/WordPress/gutenberg/blob/42a5611fa7649186190fd4411425f6e5e9deb01a/packages/block-editor/src/hooks/typography.js
 */

import { InspectorControls } from '@wordpress/block-editor';
import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	useIsFluidTypographyDisabled,
	hasFluidTypographyValue,
	resetFluidTypography,
	FluidTypographyEdit,
	saveFluidTypographyProp,
	editFluidTypographyProp,
} from './fluid-typography';

import {
	useIsHalfLeadingDisabled,
	hasHalfLeadingValue,
	resetHalfLeading,
	HalfLeadingEdit,
	saveHalfLeadingProp,
	editHalfLeadingProp,
} from './half-leading';

export {
	saveFluidTypographyProp,
	editFluidTypographyProp,
	saveHalfLeadingProp,
	editHalfLeadingProp,
};

export function TypographyPanel( props ) {
	const isFluidTypographyDisabled = useIsFluidTypographyDisabled( props );
	const isHalfLeadingDisabled = useIsHalfLeadingDisabled( props );

	if ( isFluidTypographyDisabled && isHalfLeadingDisabled ) {
		return null;
	}

	const createResetAllFilter = ( attribute ) => ( newAttributes ) => ( {
		...newAttributes,
		unitone: {
			...newAttributes.unitone,
			[ attribute ]: undefined,
		},
	} );

	return (
		<>
			<InspectorControls __experimentalGroup="typography">
				{ ! isFluidTypographyDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasFluidTypographyValue( props ) }
						label={ __( 'Fluid typography', 'unitone' ) }
						onDeselect={ () => resetFluidTypography( props ) }
						isShownByDefault={ true }
						resetAllFilter={ createResetAllFilter(
							'fluidTypograpy'
						) }
						panelId={ props.clientId }
					>
						<FluidTypographyEdit { ...props } />
					</ToolsPanelItem>
				) }

				{ ! isHalfLeadingDisabled && (
					<ToolsPanelItem
						hasValue={ () => hasHalfLeadingValue( props ) }
						label={ __( 'Half leading', 'unitone' ) }
						onDeselect={ () => resetHalfLeading( props ) }
						isShownByDefault={ true }
						resetAllFilter={ createResetAllFilter( 'halfLeading' ) }
						panelId={ props.clientId }
					>
						<HalfLeadingEdit { ...props } />
					</ToolsPanelItem>
				) }
			</InspectorControls>
		</>
	);
}
