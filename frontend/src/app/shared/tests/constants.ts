import { of } from "rxjs";

export const dbData = {
  participantsShort: [
    {
      _id: 'someid',
      fullName: {en: 'fullname', ua: 'піб'}
    }
  ],
  participants: [
    {
      _id: 'someid',
      fullName: {en: 'fullname', ua: 'піб'},
      bio: {en: 'bio', ua: 'біо'},
      imageUrl: 'https://someurl',
      works: ['someid']
    }
  ],
  worksItem: {
    _id: 'someid',
    title: {
      ua: 'назва',
      en: 'title'
    },
    description: {
      ua: 'опис',
      en: 'description'
    },
    participants: ['someid']
  },
  worksItemsShort: [
    {_id: 'qwerty', title: {en: 'qwerty', ua: 'йцукен'}},
    {_id: 'qwerty', title: {en: 'qwerty', ua: 'йцукен'}},
    {_id: 'qwerty', title: {en: 'qwerty', ua: 'йцукен'}},
    {_id: 'qwerty', title: {en: 'qwerty', ua: 'йцукен'}}
  ]
}

export const mockProviders = {
  mockRouteWithId: {
    paramMap: of({
      get: () => 10,
    })
  },
  mockToasterService: {
    showMessage: (message: string) => message,
    showWarningMessage: (message: string) => message,
    showErrorMessage: (message: string) => message,
  }
}
