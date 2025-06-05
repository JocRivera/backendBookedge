import { Privileges } from "../models/Privileges_Model.js";

export class PrivilegesRepository {
    async findAll() {
        return await Privileges.findAll();
    }

    async findById(id) {
        return await Privileges.findByPk(id);
    }

    async create(privilege) {
        return await Privileges.create(privilege);
    }

    async update(privilege) {
        return await Privileges.update(privilege, {
            where: {
                idPrivilege: privilege.idPrivilege,
            },
        });
    }

    async delete(id) {
        return await Privileges.destroy({
            where: {
                idPrivilege: id,
            },
        });
    }
}