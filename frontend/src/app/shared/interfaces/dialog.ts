export interface DialogData {
  title: string;
  message?: string;
  item?: any;
  checkboxText?: string;
  parentId?: string;
}

export interface DialogResult {
  checkboxValue: boolean;
}
