interface IUrlParamsOptions {
  rejectOnlyUndefined?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IParamsObject = { [key: string]: any }

function urlParams(params: IParamsObject, options?: IUrlParamsOptions) {
  let query = '?'

  function isFirstElement() {
    if (query[query.length - 1] === '?') return ''
    else return '&'
  }

  Object.keys(params).forEach((key) => {
    // se não for undefined, adiciona a query
    if (
      options !== undefined && options.rejectOnlyUndefined
        ? params[key] !== undefined
        : params[key]
    )
      query += `${isFirstElement()}${key}=${params[key]}`
  })

  return query
}

export { urlParams }
