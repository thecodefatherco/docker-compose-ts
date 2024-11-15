import type {
  ComposeSpecification,
  DefinitionsService,
} from "../types/compose-spec";
import { dump, type DumpOptions } from "js-yaml";

export class Service {
  constructor(public self: DefinitionsService) {
    this.self = {
      ...this.self,
    };
  }

  static new(service: DefinitionsService) {
    return new Service(service);
  }

  get name() {
    return this.self.name;
  }

  get image() {
    return this.self.image;
  }

  get ports() {
    return this.self.ports;
  }

  get healthcheck() {
    return this.self.healthcheck;
  }
}

export class DockerCompose {
  constructor(public spec: ComposeSpecification = {}) {
    this.spec = {
      version: "3",
      ...this.spec,
    };
  }

  addRawService(name: string, service: DefinitionsService) {
    this.spec.services = {
      ...this.spec.services,
      [name]: {
        ...service,
      },
    };
  }

  addService(name: string, service: Service) {
    this.addRawService(name, service.self);
  }

  static fromObject(spec: ComposeSpecification) {
    return new DockerCompose(spec);
  }

  static fromString(spec: string) {
    return new DockerCompose(JSON.parse(spec));
  }

  toJSON(opts?: { spaces?: number }) {
    return JSON.stringify(this.spec, null, opts?.spaces);
  }

  toYAML(opts?: DumpOptions) {
    return dump(this.spec, {
      indent: 2,
      noRefs: true,
      forceQuotes: true,
      noArrayIndent: false,
      ...opts,
    });
  }

  toString(opts?: { spaces?: number }) {
    return this.toJSON(opts);
  }

  get version() {
    return this.spec.version;
  }

  get services() {
    return this.spec.services;
  }

  get networks() {
    return this.spec.networks;
  }

  get volumes() {
    return this.spec.volumes;
  }

  get secrets() {
    return this.spec.secrets;
  }
}
