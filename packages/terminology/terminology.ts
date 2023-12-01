import {
  CodeSystem,
  CodeSystemConcept,
  CodeSystemContentMode,
  CodeSystemFilter,
  CodeSystemHierarchyMeaning,
  CodeSystemProperty,
  CodeableConcept,
  Coding,
  ContactDetail,
  Extension,
  Identifier,
  Meta,
  Narrative,
  Period,
  PublicationStatus,
  RelatedArtifact,
  Resource,
  UsageContext,
} from "@bonfhir/core/r5";
import { TerminologyRecord } from "fhir-roast-database/terminology-record";

export abstract class Terminology implements CodeSystem {
  resourceType: "CodeSystem";
  name?: string | undefined;
  version?: string | undefined;
  url?: string | undefined;
  approvalDate?: string | undefined;
  author?: ContactDetail[] | undefined;
  caseSensitive?: boolean | undefined;
  compositional?: boolean | undefined;
  concept?: CodeSystemConcept[] | undefined;
  contact?: ContactDetail[] | undefined;
  content: CodeSystemContentMode;
  copyright?: string | undefined;
  copyrightLabel?: string | undefined;
  count?: number | undefined;
  date?: string | undefined;
  description?: string | undefined;
  editor?: ContactDetail[] | undefined;
  effectivePeriod?: Period | undefined;
  endorser?: ContactDetail[] | undefined;
  experimental?: boolean | undefined;
  filter?: CodeSystemFilter[] | undefined;
  hierarchyMeaning?: CodeSystemHierarchyMeaning | undefined;
  identifier?: Identifier[] | undefined;
  jurisdiction?: CodeableConcept[] | undefined;
  lastReviewDate?: string | undefined;
  property?: CodeSystemProperty[] | undefined;
  publisher?: string | undefined;
  purpose?: string | undefined;
  relatedArtifact?: RelatedArtifact[] | undefined;
  reviewer?: ContactDetail[] | undefined;
  status: PublicationStatus;
  supplements?: string | undefined;
  title?: string | undefined;
  topic?: CodeableConcept[] | undefined;
  useContext?: UsageContext[] | undefined;
  valueSet?: string | undefined;
  versionAlgorithmString?: string | undefined;
  versionAlgorithmCoding?: Coding | undefined;
  versionNeeded?: boolean | undefined;
  contained?: Resource[] | undefined;
  extension?: Extension[] | undefined;
  modifierExtension?: Extension[] | undefined;
  text?: Narrative | undefined;
  id?: string | undefined;
  implicitRules?: string | undefined;
  language?: string | undefined;
  meta?: Meta | undefined;

  constructor(name: string, version: string, url: string) {
    this.resourceType = "CodeSystem";
    this.name = name;
    this.version = version;
    this.url = url;
    this.content = "not-present";
    this.status = "active";
  }

  // TODO: this will probably change a lot
  // TODO: maybe group into an interface
  abstract import(): TerminologyRecord[];
  abstract finder(): (
    records: TerminologyRecord[],
    coding: Partial<Coding>
  ) => CodeableConcept | undefined;
}
