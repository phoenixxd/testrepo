import React from 'react';
import Accordion from '@salesforce/design-system-react/components/accordion'; 
import AccordionPanel from '@salesforce/design-system-react/components/accordion/panel'; 
import IconSettings from '@salesforce/design-system-react/components/icon-settings'; 
import Dropdown from '@salesforce/design-system-react/components/menu-dropdown'; 

// import {Accordion, AccordionPanel, IconSettings, Dropdown} from '@salesforce/design-system-react';

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expandedPanels: {},
			items: [
				{
					id: '1',
					summary: 'Accordion Summary',
					details: 'Accordion details - A',
				},
				{
					id: '2',
					summary: 'Accordion Summary',
					details: 'Accordion details - B',
				},
				{
					id: '3',
					summary: 'Accordion Summary',
					details: 'Accordion details - C',
				},
			],
		};
	}

	menuDropdown(selectedItem) {
		return (
			<Dropdown
				align="right"
				id={selectedItem.id}
				assistiveText={{ icon: 'More Options' }}
				buttonVariant="icon"
				buttonClassName="slds-shrink-none"
				iconCategory="utility"
				iconName="down"
				iconVariant="border-filled"
				onSelect={(option) => {
					if (option.label === 'delete') {
						this.setState((state) => ({
							...state,
							items: state.items.filter((item) => item.id !== selectedItem.id),
						}));
					}
				}}
				options={[
					{
						label: 'delete',
						value: 'A0',
					},
					{
						label: 'redo',
						value: 'B0',
					},
					{
						label: 'activate',
						value: 'C0',
					},
				]}
				iconSize="x-small"
			/>
		);
	}

	togglePanel(event, data) {
		this.setState((state) => ({
			...state,
			expandedPanels: {
				[data.id]: !state.expandedPanels[data.id],
			},
		}));
		if (this.props.action) {
			const dataAsArray = Object.keys(data).map((id) => data[id]);
			this.props.action('onClick')(event, ...dataAsArray);
		} else if (console) {
			console.log('[onSelect] (event, data)', event, data);
		}
	}

	render() {
		return (
			<IconSettings iconPath="/icons">
				<Accordion id="base-example-accordion">
					{this.state.items.map((item, i) => {
						return (
							<AccordionPanel
								expanded={!!this.state.expandedPanels[item.id]}
								id={item.id}
								panelContentActions={this.menuDropdown(item)}
								key={item.id}
								onTogglePanel={(event) => this.togglePanel(event, item)}
								summary={item.summary}
							>
								{item.details}
							</AccordionPanel>
						);
					})}
				</Accordion>
			</IconSettings>
		);
	}
}

export default Example;