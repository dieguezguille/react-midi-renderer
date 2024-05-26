import Reconciler from "react-reconciler";
import MidiWriter from "midi-writer-js";

interface MIDIProps {
  pitch?: string;
  duration?: string;
  velocity?: number;
  children?: React.ReactNode;
}

const hostConfig: Reconciler.HostConfig<
  string, // Type for the element type (e.g., 'midi-note')
  MIDIProps, // Type for the props
  any, // Type for the container (we'll use 'any' for simplicity)
  any, // Type for the instance
  any, // Type for the text instance
  any, // Type for the suspense instance
  any, // Type for the hydratable instance
  any, // Type for the public instance
  any, // Type for the host context
  any, // Type for the update payload
  any, // Type for the child set (for persistent mode)
  number, // Type for the timeout handle
  any // Type for the no timeout handle
> = {
  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),
  shouldSetTextContent: (type: string, props: MIDIProps) => false,
  createInstance: (type: string, props: MIDIProps) => ({
    type,
    props,
    children: [],
  }),
  createTextInstance: (text: string) => ({ type: "text", text }),
  appendInitialChild: (parent: any, child: any) => {
    parent.children.push(child);
  },
  appendChildToContainer: (container: any, child: any) => {
    container.children.push(child);
  },
  appendChild: (parent: any, child: any) => {
    parent.children.push(child);
  },
  removeChild: (parent: any, child: any) => {
    parent.children = parent.children.filter((c: any) => c !== child);
  },
  removeChildFromContainer: (container: any, child: any) => {
    container.children = container.children.filter((c: any) => c !== child);
  },
  insertBefore: (parent: any, child: any, beforeChild: any) => {
    const index = parent.children.indexOf(beforeChild);
    if (index !== -1) {
      parent.children.splice(index, 0, child);
    }
  },
  finalizeInitialChildren: () => false,
  prepareUpdate: () => null,
  commitUpdate: () => {},
  commitTextUpdate: () => {},
  supportsMutation: true,
  clearContainer: () => {},
  prepareForCommit: () => null,
  resetAfterCommit: () => {},
  getPublicInstance: (instance: any) => instance,
  resetTextContent: () => {},
  commitMount: () => {},
  supportsPersistence: false,
  preparePortalMount: () => {},
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  supportsHydration: false,
  getInstanceFromScope: () => null,
  prepareScopeUpdate: () => {},
  getInstanceFromNode: () => null,
  appendChildToContainerChildSet: () => {},
  isPrimaryRenderer: true,
  getCurrentEventPriority: () => 0,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  detachDeletedInstance: () => {},
};

const MIDIReconciler = Reconciler(hostConfig);

const renderMIDI = (element: React.ReactElement) => {
  const container = {
    children: [],
  };

  const reconcilerInstance = MIDIReconciler.createContainer(
    container, // containerInfo
    0, // tag (RootTag - typically 0 for LegacyRoot or 1 for ConcurrentRoot)
    null, // hydrationCallbacks
    false, // isStrictMode
    null, // concurrentUpdatesByDefaultOverride
    "", // identifierPrefix
    (error: Error) => {
      console.error(error);
    }, // onRecoverableError
    null // transitionCallbacks
  );

  MIDIReconciler.updateContainer(element, reconcilerInstance, null, null);

  const track = new MidiWriter.Track();

  const renderNode = (node: any) => {
    if (node.type === "midi-note") {
      const { pitch, duration, velocity } = node.props;
      track.addEvent(new MidiWriter.NoteEvent({ pitch, duration, velocity }));
    } else {
      node.children.forEach(renderNode);
    }
  };

  container.children.forEach(renderNode);

  const write = new MidiWriter.Writer(track);
  return write.buildFile();
};

export { renderMIDI };
