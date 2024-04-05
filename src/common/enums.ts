// src/common/enums.ts
// Enums for this system used

// Gender
export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

// Family relation for the input service
export enum Relationship {
    // FamilyRelationType.PARENT
    FATHER = 'father',
    MOTHER = 'mother',
    FATHER_IN_LAW = 'father_in_law',
    MOTHER_IN_LAW = 'mother_in_law',
    // FamilyRelationType.PARENT (inversive)
    SON = 'son',
    DAUGHTER = 'daughter',
    // FamilyRelationType.SPOUSE
    HUSBAND = 'husband',
    WIFE = 'wife',
    // FamilyRelationType.SIBLING
    BROTHER = 'brother',
    YOUNGER_BROTHER = 'younger_brother',
    SISTER = 'sister',
    YOUNGER_SISTER = 'younger_sister',
    // FamilyRelationType.FRIEND
    FRIEND = 'friend',
    // FamilyRelationType.ETC
    GRANDFATHER = 'grandfather',
    GRANDMOTHER = 'grandmother',
    GRANDSON = 'grandson',
    GRANDDAUGHTER = 'granddaughter',
    UNCLE = 'uncle',
    AUNT = 'aunt',
    NEPHEW = 'nephew',
    NIECE = 'niece',
    COUSIN = 'cousin',
    RELATIVE = 'relative',
}

// Family relation for the familyJUNC entity
export enum FamilyRelationType {
    PARENT = 'parent',
    SPOUSE = 'spouse',
    SIBLING = 'sibling',
    FRIEND = 'friend',
    ETC = 'etc',
}
