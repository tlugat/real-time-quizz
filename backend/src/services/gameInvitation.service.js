const ValidationError = require("../errors/ValidationError");
const GameInvitation = require("../models/gameInvitation.model");

module.exports = () => {
	return {
		async findAll(criteria, { page = null, itemsPerPage = null, order = {} }) {
			try {
				const invitationList = await GameInvitation.find(criteria)
					.limit(itemsPerPage)
					.skip((page - 1) * itemsPerPage)
					.sort(order);
				return invitationList;
			} catch (error) {
				throw error;
			}
		},
		async create(data) {
			try {
				const invitation = await GameInvitation.create(data);
				return invitation;
			} catch (error) {
				if (error.name === "ValidationError") {
					throw ValidationError.createFromMongooseValidationError(error);
				}
				throw error;
			}
		},
		async findOneById(id) {
			try {
				const invitation = await GameInvitation.findById(id);
				return invitation;
			} catch (error) {
				throw error;
			}
		},
		async findOne(criteria) {
			try {
				const invitation = await GameInvitation.findOne(criteria);
				return invitation;
			} catch (error) {
				throw error;
			}
		},
		async replaceOne(id, newData) {
			try {
				const deleted = await this.deleteOne(id);
				const invitation = await this.create({ ...newData, _id: id });

				return [invitation, !deleted];
			} catch (error) {
				if (error.name === "ValidationError") {
					throw ValidationError.createFromMongooseValidationError(error);
				}
				throw error;
			}
		},
		async updateOne(id, newData) {
			try {
				const invitation = await GameInvitation.findByIdAndUpdate(id, newData, {
					new: true,
				});
				return invitation;
			} catch (error) {
				if (error.name === "ValidationError") {
					throw ValidationError.createFromMongooseValidationError(error);
				}
				throw error;
			}
		},
		async deleteOne(id) {
			try {
				await GameInvitation.findByIdAndDelete(id);
				return true;
			} catch (error) {
				throw error;
			}
		},
	};
};
