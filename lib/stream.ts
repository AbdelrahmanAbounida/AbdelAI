type TextStream = ReadableStreamDefaultReader<Uint8Array>;

/* *************************************** */

const fetchData = async <T>(
  url: string,
  body: T
): Promise<TextStream | undefined> => {
  url = process.env.NEXT_PUBLIC_CHAT_BACKEND_URL + url;

  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      api_key: process.env.NEXT_PUBLIC_BACKEND_SERVER_API_KEY as string,
    },
    body: JSON.stringify(body),
  });

  if (response.status === 409) {
    const error = (await response.json()) as { error: string; detail: string };
    throw new Error(error.detail);
  }

  return response.body?.getReader();
};

/* *************************************** */

async function readStream(reader: TextStream): Promise<string | null> {
  const result = await reader.read();
  return result.done ? null : new TextDecoder().decode(result.value);
}

/* *************************************** */

async function processStream(
  reader: TextStream,
  onStart: () => void,
  onText: (text: string) => void,
  shouldClose: () => boolean
): Promise<void> {
  onStart();
  while (true) {
    if (shouldClose()) {
      await reader.cancel();
      return;
    }

    const text = await readStream(reader);
    if (text === null) break;
    onText(text);
  }
}

/* *************************************** */

export const streamText = async <T>(
  url: string,
  body: T,
  onStart: () => void,
  onText: (text: string) => void,
  shouldClose: () => boolean // Event handler to close connection early
) => {
  const reader = await fetchData(url, body);
  if (!reader) {
    return;
  }

  await processStream(reader, onStart, onText, shouldClose);
};
