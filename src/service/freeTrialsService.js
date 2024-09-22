import freeTrialsModel from '../model/freeTrialsModel.js';

// Create a new free trial
const createFreeTrial = async (postBody) => {
    return freeTrialsModel.create(postBody);
};

// Get all free trials
const getAllFreeTrials = async () => {
    return freeTrialsModel.findAll();
};

// Update a free trial
const updateFreeTrial = async (postBody, id) => {
    const [updated] = await freeTrialsModel.update(postBody, {
        where: { ID: id },
    });
    return updated > 0; // Returns true if any row was updated, false otherwise
};

// Get a single free trial by ID
const getFreeTrialById = async (id) => {
    return freeTrialsModel.findByPk(id);
};

// Delete a free trial
const deleteFreeTrial = async (id) => {
    const deleted = await freeTrialsModel.destroy({
        where: { ID: id },
    });
    return deleted > 0; // Returns true if any row was deleted, false otherwise
};

export const freeTrialsService = {
    createFreeTrial,
    getAllFreeTrials,
    updateFreeTrial,
    getFreeTrialById,
    deleteFreeTrial,
};
