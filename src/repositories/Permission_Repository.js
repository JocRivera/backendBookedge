import { Permissions } from "../models/Permissions_Model";

export class PermissionRepository {
    async findAll() {
        return await Permissions.findAll();
    }

    async findById(id) {
        return await Permissions.findByPk(id);
    }

    async create(permission) {
        return await Permissions.create(permission);
    }

    async update(permission) {
        return await Permissions.update(permission, {
            where: {
                idPermission: permission.idPermission
            }
        });
    }

    async delete(id) {
        return await Permissions.destroy({
            where: {
                idPermission: id
            }
        });
    }

}

