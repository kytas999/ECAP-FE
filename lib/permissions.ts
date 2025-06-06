import {
  type Permissions,
  type RolesWithPermissions,
  type Sample,
  SampleStatus,
  type User,
} from '@/types';

export const ROLES = {
  DIRECTOR: {
    samples: {
      flag: false,
      approve: false,
      correct: false,
      review: true,
      upload: false,
    },
    navigation: {
      settings: false,
      profile: true,
    },
    sorting: {
      'sort:academy': false,
    },
  },
  TEACHER: {
    samples: {
      flag: (user: User, data: Sample) => {
        return data.status !== SampleStatus.COMPLETED;
      },
      approve: true,
      correct: true,
      review: true,
      upload: (user: User, data: Sample) => {
        return data.status !== SampleStatus.COMPLETED;
      },
    },
    navigation: {
      settings: false,
      profile: true,
    },
    sorting: {
      'sort:academy': true,
    },
  },
  ADMIN: {
    samples: {
      flag: (user: User, data: Sample) => {
        return data.status !== SampleStatus.COMPLETED;
      },
      approve: true,
      correct: true,
      review: true,
      upload: (user: User, data: Sample) => {
        return data.status !== SampleStatus.COMPLETED;
      },
    },
    navigation: {
      settings: true,
      profile: true,
    },
    sorting: {
      'sort:academy': true,
    },
  },
  SUPER_ADMIN: {
    samples: {
      flag: (user: User, data: Sample) => {
        return data.status !== SampleStatus.COMPLETED;
      },
      approve: true,
      correct: true,
      review: true,
      upload: (user: User, data: Sample) => {
        return data.status !== SampleStatus.COMPLETED;
      },
    },
    navigation: {
      settings: true,
      profile: true,
    },
    sorting: {
      'sort:academy': true,
    },
  },
  STUDENT: {
    samples: {
      flag: false,
      approve: false,
      correct: false,
      review: false,
      upload: false,
    },
    navigation: {
      settings: false,
      profile: true,
    },
    sorting: {
      'sort:academy': false,
    },
  },
} as const satisfies RolesWithPermissions;

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType']
) {
  if (!user || !user.role) return false;
  const permission = (ROLES as RolesWithPermissions)[user.role]?.[resource]?.[action];
  if (permission == null) return false;

  if (typeof permission === 'boolean') return permission;
  return data != null && permission(user, data);
}
