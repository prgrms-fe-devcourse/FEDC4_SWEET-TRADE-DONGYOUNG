import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { notify } from '@/components/atoms/Toast'
import APP_PATH from '@/config/paths'
import { SIGN_CONSTANT } from '@/constants/sign'
import { loginUser } from '@/services/auth'

export interface LoginReqBody {
  email: string
  password: string
}

export const useLogin = () => {
  const router = useRouter()
  const login = async ({ email, password }: LoginReqBody) => {
    try {
      const res = await loginUser({ email, password })
      if (!!res) {
        router.push(APP_PATH.home())
      }
    } catch (error) {
      const { response } = error as unknown as AxiosError
      if ((response?.data as any).error === SIGN_CONSTANT.LOGINREJECT) {
        notify('error', '아이디와 비밀번호를 다시 확인해 주세요')
      }
    }
    return null
  }
  return { login }
}
