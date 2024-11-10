import { useReducer } from 'react'

const STATUS = {
    idle: 'idle',
    loading: 'loading',
    success: 'success',
    fail: 'fail',
}

const reducer = (state, { type, payload }) => {
    const status = type
    switch (type) {
        case STATUS.loading: {
            return {
                ...state,
                status,
            }
        }
        case STATUS.success: {
            return {
                ...state,
                status,
                data: payload,
            }
        }
        case STATUS.fail: {
            return {
                ...state,
                status,
                error: payload,
            }
        }
        default: {
            return state
        }
    }
}

const useFetch = name => {
    const [_state, _dispatch] = useReducer(reducer, {
        status: STATUS.idle,
        data: undefined,
        error: '',
    })

    const dispatch = (type, payload) => {
        _dispatch({ type, payload })
    }

    const dispatchFetch = async fetchFunc => {
        dispatch(STATUS.loading)
        const data = await fetchFunc()
        if (data) {
            dispatch(STATUS.success, data)
        } else {
            dispatch(STATUS.fail, 'Fetch Error')
        }
    }

    const state = [
        // data
        _state.status === STATUS.success ? _state.data : undefined,
        // isLoading
        _state.status === STATUS.loading,
        // error
        _state.status === STATUS.fail ? _state.error : '',
    ]
    // console.log(name, state)

    return [
        // dispatch fetch func
        dispatchFetch,
        ...state,
    ]
}

export default useFetch
