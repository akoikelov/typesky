import {
  Container,
  RegistrationEntry,
  RegistrationType,
  Injectable
} from '../../common/dependency-container'


describe('Dependency Injection', () => {

  const testInjectionQualifier1 = 'testInjectionQualifier1'

  class DependencyMock1 implements Injectable {

    awakeAfterInjection(): void {
    }

    postConstructor(): void {
    }
  }

  describe('Container', () => {

    it('throws error if registration type is invalid', () => {
      const container = new Container()

      const testQualifier = 'TestInjection'

      const registrationEntry = new RegistrationEntry(
        'Invalid' as any,
        () => new DependencyMock1()
      )

      expect(() => {
        container.register(testQualifier, registrationEntry)
      }).toThrow()
    })

    it('throws error if no registration provided', () => {

      const container = new Container()

      const testQualifier = 'TestInjection'

      expect(() => {
        container.resolve(testQualifier)
      }).toThrow(`No registration for qualifier '${testQualifier}'`)
    })

    it('registers injectable entities', () => {

      const container = new Container()

      const registrationEntry =
        new RegistrationEntry(
          RegistrationType.TRANSIENT,
          () => new DependencyMock1()
        )

      container.register(testInjectionQualifier1, registrationEntry)

      expect(container.resolve(testInjectionQualifier1)).toBeInstanceOf(DependencyMock1)
    })

    it('clears injectable entities', () => {

      const container = new Container()

      const registrationEntry =
        new RegistrationEntry(
          RegistrationType.TRANSIENT,
          () => new DependencyMock1()
        )

      container.register(testInjectionQualifier1, registrationEntry)

      container.clear()

      expect(() => {
        container.resolve(testInjectionQualifier1)
      }).toThrow()
    })

    it('stores container-wide instances', () => {

      const container = new Container()

      const registrationEntry =
        new RegistrationEntry(
          RegistrationType.CONTAINER,
          () => new DependencyMock1()
        )

      container.register(testInjectionQualifier1, registrationEntry)

      const instance = container.resolve(testInjectionQualifier1)
      const otherInstance = container.resolve(testInjectionQualifier1)

      expect(otherInstance).toBe(instance)
    })

    it('constructs new transient instances', () => {

      const container = new Container()
      const registrationEntry = new RegistrationEntry(RegistrationType.TRANSIENT,
        () => new DependencyMock1())

      container.register(testInjectionQualifier1, registrationEntry)

      const instance = container.resolve(testInjectionQualifier1)
      const otherInstance = container.resolve(testInjectionQualifier1)

      expect(otherInstance).not.toBe(instance)
    })

    it('provides default container', () => {

      expect(Container.defaultContainer).toBeDefined()
    })

    it('provides component-specific containers', () => {

      const componentName = 'TestComponentName'

      expect(Container.containerForComponent(componentName)).toBeDefined()
    })
  })
})