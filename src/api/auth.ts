import client from './client';
import IUser from 'types/IUser';
import { AxiosResponse } from 'axios';

export async function isExistedId({ id }: { id: string }) {

}


export async function signUp(model: IUser): Promise<AxiosResponse> {
  // 파일 전송 해야하므로 formData 로 변경하여 전송
  const formData = new FormData();
  for (let key in model) {
    if (model.hasOwnProperty(key)) {
      if (key === 'avatar') {
        formData.append(key, model[key as keyof IUser] as File);
      } else {
        formData.append(key, model[key as keyof IUser] as string);
      }
    }
  }

  try {
    return client.post('/admin/signup', formData);
  } catch (error) {
    console.log(error);
    throw (error);
  }
}

