import Link from 'next/link'

import { useFields } from '../fields'
import Icon from '../Icon'
import { Button } from '../'
import { A } from '../Layout'

const sendMail = async (data: { name: string; email: string; message: string }) =>
  fetch('/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  })

export const Contact = () => {
  const fields = useFields<{
    name: string
    email: string
    message: string
  }>({
    name: {},
    email: {},
    message: {},
  })

//   const refs = {
//     shrink: useSpringRef(),
//     progress: useSpringRef(),
//     success: useSpringRef(),
//   }

//   const springs = useSprings(
//     3,
//     // fields.status !== 'submitting'
//     //   ? []
//     //   :
//     [
//       {
//         ref: refs.shrink,
//         to: {
//           height: '0.5rem',
//         },
//       },
//       {
//         ref: refs.progress,
//         to: {
//           right: 1,
//         },
//       },
//       {
//         ref: refs.success,
//         to: {
//           right: 1,
//         },
//       },
//     ]
//   )
//   useChain([refs.shrink, refs.progress, refs.success], [0, 1, 1])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fields.setStatus('submitting')
    sendMail(fields.clean())
      .then(() => fields.setStatus('success'))
      .catch(() => fields.setStatus('error'))
  }

  return (
    <div className="md:flex-row w-full">
      <form className="flex flex-col mt-8 max-w-screen-sm w-full" onSubmit={onSubmit}>
        <A className="space-y-4">
          <Input field={fields.get('name')} />
          <Input field={fields.get('email')} />
          <TextArea field={fields.get('message')} />
          <div className="h-0" />
          <Button className="w-fit">Let's talk</Button>
        </A>
      </form>
      <div className="mx-auto pt-32 w-full" style={{ marginLeft: '10%' }}>
        <A className="flex flex-col items-start space-y-4">
          {(
            [
              { icon: 'phone', text: '(240) 274-7148', href: 'tel:2402747148' },
              {
                icon: 'email',
                text: 'winston.trey.wilkinson@gmail.com',
                href: 'mailto:winston.trey.wilkinson@gmail.com',
              },
              {
                icon: 'linkedin',
                text: 'LinkedIn.com/in/trey-wilkinson-24b081210',
                href: 'https://LinkedIn.com/in/trey-wilkinson-24b081210',
              },
              {
                icon: 'github',
                text: 'GitHub.com/t-wilkinson',
                href: 'https://GitHub.com/t-wilkinson',
              },
            ] as const
          ).map(({ icon, text, href }) => (
            <Link href={href} key={text}>
              <a className="inline" target="_blank">
                <span className="flex flex-row items-center space-x-2">
                  <Icon icon={icon} className="" /> <span className="link">{text}</span>
                </span>
              </a>
            </Link>
          ))}
        </A>
      </div>
    </div>
  )
}

const Input = ({ field }) => {
  return (
    <label className="flex flex-col">
      <span className="font-bold text-lg">{field.label}</span>
      <input
        className="p-2 bg-mono-700 mt-[0.75em]"
        value={field.value}
        onChange={e => field.setValue(e.target.value)}
      />
    </label>
  )
}

const TextArea = ({ field }) => {
  return (
    <label className="flex flex-col">
      <span className="font-bold">{field.label}</span>
      <textarea
        className="p-2 bg-mono-700 mt-2"
        rows={5}
        value={field.value}
        onChange={e => field.setValue(e.target.value)}
      />
    </label>
  )
}

