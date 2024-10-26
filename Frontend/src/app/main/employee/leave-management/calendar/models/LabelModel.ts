import _ from '@lodash';
import { PartialDeep } from 'type-fest';


export type Label = {
	id: string;
	title: string;
	color: string;
};
/**
 * The label model.
 */
function LabelModel(data?: PartialDeep<Label>) {
	data = data || {};

	return _.defaults(data, [
	{	id: _.uniqueId(),
		title: 'Privilage leave',
		color: 'ecff00'
	},
	{
		id: _.uniqueId(),
		title: 'Sick leave',
		color: '#04f838'
	},{
		id: _.uniqueId(),
		title: 'Casual leave',
		color: '#e204f8'
	},{
		id: _.uniqueId(),
		title: 'Leave Without Pay',
		color: '#ff2d00'
	}]);
}

export default LabelModel;
