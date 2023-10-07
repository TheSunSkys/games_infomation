import 'package:flutter/material.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';
import 'package:mobile/l10n/l10n.dart';

class LanguageCubit extends HydratedCubit<String> {
  LanguageCubit() : super('th');

  void change(String code) => emit(code);

  @override
  String? fromJson(Map<String, dynamic> json) {
    final value = json['value'] as String?;
    final loc = Locale(value ?? 'th', '');

    if (!AppLocalizations.supportedLocales.contains(loc)) return 'th';

    return value ?? 'th';
  }

  @override
  Map<String, String>? toJson(String state) {
    return {'value': state};
  }
}
