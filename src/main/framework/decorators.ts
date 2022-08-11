import { INJECTABLE, INJECT_NAME, INJECT_TYPE, IPC_INVOKE, IPC_ON, PARAMTYPES_METADATA } from './constants'

export function IpcInvoke(event: string): MethodDecorator {
  if (!event)
    throw new Error('ipc invoke event is required')

  return (target: any, propertyName: string) => {
    Reflect.defineMetadata(IPC_INVOKE, event, target, propertyName)
  }
}

export function IpcOn(event: string): MethodDecorator {
  if (!event)
    throw new Error('ipc on event is required')

  return (target: any, propertyName: string) => {
    Reflect.defineMetadata(IPC_ON, event, target, propertyName)
  }
}

export function Controller(): ClassDecorator {
  return (_) => {
    // do nothing
  }
}

export function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.CLASS, target)
  }
}

export function Inject(name: string): ParameterDecorator {
  if (!name)
    throw new Error('inject name is required')

  return (target, _, index) => {
    const param = Reflect.getMetadata(PARAMTYPES_METADATA, target)[index]
    Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.CUSTOM, param)
    Reflect.defineMetadata(INJECT_NAME, name, param)
  }
}

export function Window(name = 'main'): ParameterDecorator {
  return (target, _, index) => {
    const param = Reflect.getMetadata(PARAMTYPES_METADATA, target)[index]
    Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.WINDOW, param)
    Reflect.defineMetadata(INJECT_NAME, name, param)
  }
}
